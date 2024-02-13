pipeline {
    agent {
        node {
            label 'jenkins-agent'
        }
    }
    environment {
        GIT_CREDENTIALS = credentials('github-jenkins')
        DOCKER_IMAGE_NAME = 'strikeout'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/anoop410/strikeout.git', credentialsId: GIT_CREDENTIALS]]])
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

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }
    }

}