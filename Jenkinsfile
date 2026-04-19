pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "kaviya106"
        IMAGE_BACKEND = "kaviya106/digivoterz-backend"
        IMAGE_FRONTEND = "kaviya106/digivoterz-frontend"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'jenkins-cloud', url: 'https://github.com/kaviyar23cse/digivoterz.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $IMAGE_BACKEND'
                sh 'docker push $IMAGE_FRONTEND'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}