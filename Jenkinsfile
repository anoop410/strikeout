pipeline {
    agent {
        node {
            label 'master'
        }
    }
    environment {
        APP_NAME = "strikeout"
        RELEASE = "1.0.0"
        DOCKER_PASS = 'dockerhub'
        DOCKER_USER="saianoop410"
        DOCKER_IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}" 
        DOCKER_IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
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
                    sh "sudo docker compose up -d"
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image = docker.build "${DOCKER_IMAGE_NAME}"
                    }
                    docker.withRegistry('',DOCKER_PASS){
                        docker_image.push("${DOCKER_IMAGE_TAG}")
                        docker_image.push("latest")
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    docker.image('saianoop410/strikeout').inside {
                        def scannerHome = tool 'sonarqube-scanner'
                        withSonarQubeEnv('SonarQube_Server') {
                            sh "${scannerHome}/bin/sonar-scanner"
                        }
                    }
                }
            }
        }
    }

}
