class API::V1::EventPicturesController < ApplicationController
  include Authenticable
  before_action :verify_jwt_token
  before_action :set_event
  before_action :set_event_picture, only: [:destroy]

  def index
    @event_pictures = @event.event_pictures
    render json: @event_pictures.as_json, status: :ok
  end

  def create
    @event_picture = @event.event_pictures.new(event_picture_params)
    @event_picture.user_id = current_user.id  # Asignar el usuario autenticado

    if @event_picture.save
      render json: { message: 'Image successfully uploaded.', event_picture: @event_picture }, status: :created
    else
      render json: @event_picture.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @event_picture.user_id == current_user.id
      @event_picture.destroy
      render json: { message: 'Image successfully deleted.' }, status: :no_content
    else
      render json: { error: 'You are not authorized to delete this image.' }, status: :forbidden
    end
  end

  private

  def set_event
    @event = Event.find_by(id: params[:event_id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
  end

  def set_event_picture
    @event_picture = @event.event_pictures.find_by(id: params[:id])
    render json: { error: 'Image not found' }, status: :not_found unless @event_picture
  end

  def event_picture_params
    params.require(:event_picture).permit(:description)
  end
end
