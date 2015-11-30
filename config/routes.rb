Rails.application.routes.draw do
  resources :measurement
  
  root 'page#map'
  
  get 'map' => 'page#map'
  get 'test' => 'page#test'
  get 'about' => 'page#about'
end
