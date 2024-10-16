class API::V1::EventPicturesController < ApplicationController
  include ImageProcessing
  include Authenticable

  before_action :set_event
  before_action :verify_jwt_token, only: [:create, :destroy]


  def index
    @event_pictures = @event.event_pictures.includes(:image_attachment) 

    json_response = @event_pictures.map do |event_picture|
      event_picture.as_json.merge(
        image_url: url_for(event_picture.image)
      )
    end
    json_response.each do |event_picture|
      user = User.find(event_picture['user_id'])
      event_picture.merge!(user: { id: user.id, handle: user.handle })
    end

    render json: { event_pictures: json_response }, status: :ok
  end

  def create
    if !event_picture_params[:image_base64].present?
      return render json: { error: 'Image is required.' }, status: :bad_request
    end
    @event_picture = @event.event_pictures.new(event_picture_params.except(:image_base64))
    @event_picture.user_id = current_user.id
    handle_image_attachment

    if @event_picture.save
      render json: { message: 'Image successfully uploaded.', event_picture: @event_picture }, status: :created
    else
      render json: { errors: @event_picture.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @event_picture = @event.event_pictures.find(params[:id])
    if @event_picture.destroy
      render json: { message: 'Image successfully deleted.' }, status: :no_content
    else
      render json: { errors: @event_picture.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find_by(id: params[:event_id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
  end

  def event_picture_params
    params.require(:event_picture).permit(:description, :image_base64)
  end

  def handle_image_attachment
    decoded_image = decode_image(event_picture_params[:image_base64])
    @event_picture.image.attach(io: decoded_image[:io], filename: decoded_image[:filename], content_type: decoded_image[:content_type])
  end

  def set_event_picture
    @event_picture = @event.event_pictures.find_by(id: params[:id])
    render json: { error: 'Image not found' }, status: :not_found unless @event_picture
  end
end
