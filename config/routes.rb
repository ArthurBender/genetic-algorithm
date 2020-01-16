Rails.application.routes.draw do
  root "experiments#index"
  resources :experiments, only: [:index, :new, :create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end