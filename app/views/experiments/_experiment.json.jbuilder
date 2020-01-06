json.extract! experiment, :id, :word, :population, :mutation, :generations, :fitness, :created_at, :updated_at
json.url experiment_url(experiment, format: :json)
