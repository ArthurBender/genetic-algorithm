Rails.application.routes.draw do
  root "experiments#index"
  resources :experiments, only: [:index, :new, :create, :destroy]
  get '/update_language', to: 'application#update_cookie_language'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end