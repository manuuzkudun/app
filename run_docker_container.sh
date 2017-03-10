host_dir=$1
container_dir=$2
docker_container=$3
compiler=$4
file_to_run=$5

sudo docker run -v $host_dir':/'$container_dir \
  $docker_container bash -c "usercode/script.sh '$compiler' '$file_to_run' && ls">debug
