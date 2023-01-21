class ExperimentsController < ApplicationController
  # GET /experiments
  # GET /experiments.json
  def index
    @experiments_list = []
    @experiments_list = JSON.parse(cookies[:experiments]) if cookies[:experiments]
  end

  # GET /experiments/new
  def new
    @experiment = Experiment.new
  end

  # POST /experiments
  # POST /experiments.json
  def create
    begin
      experiments_list = []
      experiments_list = JSON.parse(cookies[:experiments]) if cookies[:experiments]
      
      new_experiment = {}
      ['word', 'population', 'mutation', 'generations', 'fitness', 'time'].each do |experiment_field|
        new_experiment[experiment_field] = experiment_params[experiment_field]
      end
      experiments_list.push(new_experiment)

      cookies.permanent['experiments'] = experiments_list.to_json

      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Experiment was successfully created.' }
        format.json { render :index, status: :created }
      end
    rescue Exception => e
      respond_to do |format|
        format.html { render :new }
        format.json { render json: e.message.to_json, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /experiments/1
  # DELETE /experiments/1.json
  def destroy
    begin
      experiments_list = JSON.parse(cookies[:experiments]) if cookies[:experiments]

      experiments_list.delete_at(params[:id].to_i)


      cookies.permanent['experiments'] = experiments_list.to_json

      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Experiment was successfully destroyed.' }
        format.json { head :no_content }
      end
    rescue Exception => e
      puts e.message
      respond_to do |format|
        format.html { redirect_to root_url, alert: 'Problem when destroying experiment.' }
        format.json { render json: e.message.to_json, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def experiment_params
      params.require(:experiment).permit(:word, :population, :mutation, :generations, :fitness, :time)
    end
end
