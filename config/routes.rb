Rails.application.routes.draw do
  root "experiments#index"
  resources :experiments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
