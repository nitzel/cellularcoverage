Rails.application.routes.draw do
  resources :measurement
  
  root 'page#map'
  
  get 'page/map' => 'page#map'
  get 'page/test' => 'page#test'
end
