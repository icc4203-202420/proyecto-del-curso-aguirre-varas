class API::V1::ReviewsController < ApplicationController
  respond_to :json
  before_action :set_user, only: [:create]
  before_action :set_review, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      set_user
      @reviews = Review.where(user: @user)
    elsif params[:beer_id]
      @reviews = Review.where(beer_id: params[:beer_id])
    else
      @reviews = Review.all
    end
    new_reviews = []
    for review in @reviews
      user_handle = User.find(review[:user_id]).handle
      review_with_user = review.as_json.merge({ user_handle: user_handle })
      new_reviews.push(review_with_user)
    end
    render json: { reviews: new_reviews }, status: :ok
  end

  def show
    if @review
      render json: { review: @review }, status: :ok
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  def create
    @review = @user.reviews.build(review_params)
    if @review.save
      render json: @review, status: :created, location: api_v1_review_url(@review)
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(review_params)
      render json: @review, status: :ok
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @review.destroy
    head :no_content
  end

  private

  def set_review
    @review = Review.find_by(id: params[:id])
    render json: { error: "Review not found" }, status: :not_found unless @review
  end

  def set_user
    @user = User.find(params[:user_id]) 
  end

  def review_params
    params.require(:review).permit(:id, :text, :rating, :beer_id)
  end
end
