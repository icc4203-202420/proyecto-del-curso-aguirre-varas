class API::V1::FriendshipsController < ApplicationController
  include Authenticable

  respond_to :json
  before_action :set_user, only: [:index, :create]
  before_action :set_friendship, only: [:show, :destroy]
  before_action :verify_jwt_token

  def index
    @friendships = Friendship.where(user_id: @user.id)
    render json: { friendships: @friendships }, status: :ok
  end

  def show
    if @friendship
      render json: { friendship: @friendship }, status: :ok
    else
      render json: { error: "friendship not found" }, status: :not_found
    end
  end

  def create
    @friendship = @user.friendships.build(friendship_params)
    if @friendship.save
      render json: @friendship, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end


  def destroy
    @friendship.destroy
    render json: { message: 'Friendship successfully deleted.' }
  end

  private

  def set_friendship
    @friendship = Friendship.find_by(id: params[:id])
    render json: { error: "friendship not found" }, status: :not_found unless @friendship
  end

  def set_user
    @user = User.find(params[:user_id]) 
  end

  def friendship_params
    params.require(:friendship).permit(:id, :friend_id, :bar_id)
  end
end 