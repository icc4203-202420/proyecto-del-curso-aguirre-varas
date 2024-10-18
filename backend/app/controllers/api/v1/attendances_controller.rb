class API::V1::AttendancesController < ApplicationController
  include Authenticable
  before_action :set_attendance, only: [:destroy]
  before_action :verify_jwt_token, only: [:create, :destroy, :check_in]

  def index
    if params[:event_id]
      @attendances = Attendance.where(event_id: params[:event_id])
    else
      @attendances = Attendance.all
    end
    render json: @attendances
  end

  def create
    user_id = current_user.id

    if params[:event_id]
      @event = Event.find_by(id: params[:event_id])
      if !@event
        render json: { error: 'Event not found' }, status: :not_found
      end
    else
      render json: { error: 'Event not found' }, status: :not_found
    end

    @attendance = Attendance.new(event_id: @event.id , user_id: user_id)
    if @attendance.save
      render json: @attendance, status: :created
    else
      render json: @attendance.errors, status: :unprocessable_entity
    end
  end

  def destroy 
    @attendance.destroy
    render json: { message: 'Attendance deleted successfully' }, status: :ok
  end

  def all_check_ins
    if params[:event_id]
      @event = Event.find_by(id: params[:event_id])
      if !@event
        render json: { error: 'Event not found' }, status: :not_found
      end
    else
      render json: { error: 'Event not found' }, status: :not_found
    end
    @attendances = Attendance.where(event_id: @event.id, checked_in: true)
    render json: @attendances
  end

  def check_in
    @user = current_user
    @event_id = params[:event_id]
    @attendance = Attendance.find_by(user_id: @user.id, event_id: @event_id)
    if @attendance
      @attendance.update(checked_in: true)
      render json: @attendance, status: :ok
    else
      render json: { error: 'Attendance not found' }, status: :not_found
    end
  end

  private 
  def set_attendance
    @attendance = Attendance.find_by(id: params[:id])
    render json: { error: 'Attendance not found' }, status: :not_found unless @attendance
  end


end

