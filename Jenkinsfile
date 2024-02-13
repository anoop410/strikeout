pipeline {
    agent {
        node {
            label 'aws-jenkins-gent'
        }
    }
    environment {
        DOCKER_IMAGE_NAME = 'strikeout'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh "docker compose up -d"
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Build and push Docker images dynamically using environment variables
                    sh "docker build -t $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG ."
                    sh "docker push $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
                }
            }
        }
    }

}
