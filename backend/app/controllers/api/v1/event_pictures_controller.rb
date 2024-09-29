class API::V1::EventPicturesController < ApplicationController
  include Authenticable
  include ImageProcessing  # Assuming you have a module to process Base64 images
  before_action :verify_jwt_token
  before_action :set_event
  before_action :set_event_picture, only: [:destroy]

  def create
    @event_picture = @event.event_pictures.new(event_picture_params)
    @event_picture.user_id = current_user.id  # Assign the current user as the uploader

    handle_image_attachment if event_picture_params[:image_base64]

    if @event_picture.save
      render json: { message: 'Image successfully uploaded.', event_picture: @event_picture }, status: :created
    else
      render json: @event_picture.errors, status: :unprocessable_entity
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

  # Adapted handle_image_attachment for EventPicture
  def handle_image_attachment
    decoded_image = decode_image(event_picture_params[:image_base64])
    @event_picture.image.attach(io: decoded_image[:io], filename: decoded_image[:filename], content_type: decoded_image[:content_type])
  end

  def set_event_picture
    @event_picture = @event.event_pictures.find_by(id: params[:id])
    render json: { error: 'Image not found' }, status: :not_found unless @event_picture
  end
end
