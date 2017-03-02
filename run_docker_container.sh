host_dir=$1
container_dir=$2
docker_container=$3
compiler=$4

echo $compiler >debug
docker run -v $host_dir':/'$container_dir \
  $docker_container bash -c "usercode/script.sh '$compiler' test.rb && gem list">debug
