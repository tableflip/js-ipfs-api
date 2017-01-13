node {
	stage('fetch') {
		checkout scm
	}
	stage('build') {
		sh "docker build -t ipfs/js-ipfs-api-test ."
	}
	stage('test') {
		sh "docker run --privileged -t ipfs/js-ipfs-api-test npm test"
	}
}
