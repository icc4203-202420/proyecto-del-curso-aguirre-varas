class API::V1::EventsController < ApplicationController
  include ImageProcessing
  include Authenticable

  respond_to :json
  before_action :set_event, only: [:show, :update, :destroy, :generate_summary]
  before_action :verify_jwt_token, only: [:create, :update, :destroy, :generate_summary]

  def index
    @events = params[:bar_id] ? Event.where(bar_id: params[:bar_id]) : Event.all

    json_response = @events.map do |event|
      event_data = event.as_json
      event_data[:image_url] = url_for(event.flyer) if event.flyer.attached?
      event_data
    end

    render json: { events: json_response }, status: :ok
  end

  def show
    event_data = @event.as_json

    event_data[:image_url] = url_for(@event.flyer) if @event.flyer.attached?

    event_data[:video_url] = url_for(@event.video) if @event.video.attached?

    render json: { event: event_data }, status: :ok
  end

  def create
    @event = Event.new(event_params.except(:image_base64))
    handle_image_attachment if event_params[:image_base64]

    if @event.save
      render json: { event: @event, message: 'Event created successfully.' }, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end
  
  def update
    handle_image_attachment if event_params[:image_base64]

    if @event.update(event_params.except(:image_base64))
      render json: { event: @event, message: 'Event updated successfully.' }, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @event.destroy
      render json: { message: 'Event successfully deleted.' }, status: :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end  

  def generate_summary
    GenerateEventSummaryVideoJob.perform_later(@event.id)
    
    render json: { message: "El video está siendo generado en segundo plano. Se actualizará cuando esté listo." }, status: :accepted
  end
  private

  def set_event
    @event = Event.find_by(id: params[:id])
    render json: { error: 'Event not found' }, status: :not_found unless @event
  end

  def event_params
    params.require(:event).permit(:name, :description, :date, :bar_id, :start_date, :end_date, :image_base64)
  end

  def handle_image_attachment
    decoded_image = decode_image(event_params[:image_base64])
    @event.flyer.attach(io: decoded_image[:io], filename: decoded_image[:filename], content_type: decoded_image[:content_type])
  end  
end
