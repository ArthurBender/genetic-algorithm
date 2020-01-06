class CreateExperiments < ActiveRecord::Migration[5.2]
  def change
    create_table :experiments do |t|
      t.string :word
      t.integer :population
      t.float :mutation
      t.integer :generations
      t.float :fitness

      t.timestamps
    end
  end
end
