pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                sh 'docker build -t jv-agricultor .'
                sh 'docker service rm $(docker service ls -q)'
                sh 'docker stack deploy -c docker-compose.yml webservice'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}