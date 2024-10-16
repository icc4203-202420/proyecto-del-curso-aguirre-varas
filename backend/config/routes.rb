Rails.application.routes.draw do
  # devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'api/v1/login',
    sign_out: 'api/v1/logout',
    registration: 'api/v1/signup'
  },
  controllers: {
    sessions: 'api/v1/sessions',
    registrations: 'api/v1/registrations'
  }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :beers do
        resources :reviews, only: [:index]
      end
      resources :bars do
        resources :events, only: [:index] do
          resources :attendances, only: [:index, :create]
         
        end
      end
      resources :events do
        resources :attendances, only: [:index, :create]
         post 'check_in', to: 'attendances#check_in'
          get 'all_check_ins', to: 'attendances#all_check_ins'
        resources :event_pictures, only: [:index, :create, :destroy]
      end
      resources :users do
        resources :reviews, only: [:index]
        resources :friendships, only: [:index, :show, :create, :destroy]
      end
      
      resources :attendances, only: [:index]
      resources :reviews, only: [:index, :show, :create, :update, :destroy]
    end
  end

end
