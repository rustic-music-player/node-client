pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-v /usr/share/jenkins/cache:/build_cache'
        }
    }

    triggers {
        pollSCM('H/30 * * * *')
        upstream(upstreamProjects: 'rustic/daemon/master', threshold: hudson.model.Result.SUCCESS)
    }

    environment {
        YARN_CACHE_FOLDER='/build_cache/yarn'
    }

    stages {
        stage('Package') {
            steps {
                copyArtifacts filter: 'librustic_ffi_client.so', projectName: '/rustic/daemon/master', target: 'lib'
                sh 'npm pack'
            }
            post {
                success {
                    archiveArtifacts artifacts: '*.tgz', fingerprint: true
                }
            }
        }
    }
}
