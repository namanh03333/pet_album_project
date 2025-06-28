# Description 
    Pet Album is a web application that helps users log in, manage and share pet information (name, age, photos, comments)

# Set up enviroment 

## BackEnd 
    cd BackEnd
    cd app
    poetry install          
    poetry run uvicorn app.main:app --reload

## FrontEnd 
    cd FrontEnd
    cd pet-album
    npm start 

## Set up Database 
    Creating pet_album database in PostgreSql then replacing information in config.py with your own PostgreSQL credentials
    
    
