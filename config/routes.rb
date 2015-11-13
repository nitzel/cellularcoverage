Rails.application.routes.draw do
  resources :measurement
  
  root 'welcome#index'
  
  get 'pages/index' => 'welcome#index'
  get 'pages/test' => 'welcome#test'
end
