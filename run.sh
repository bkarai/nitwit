#/usr/bin/env sh

APP_NAME="outwit";
OS_TYPE=$(uname);

function load_env_file() {
    set -o allexport;
    source $1;
    set +o allexport;
}

function log() {
    echo "### outwit ### - ${1}";
    return $?;
}

function is_os_type() {
    if [ $1 == $(uname) ]; then
        return 1;
    else
        return 0;
    fi
}

function is_mac() {
    is_os_type 'Darwin';
    return $?;
}

function is_linux() {
    is_os_type 'Linux';
    return $?;
}

# Either "development" or "production"
ENV="development";

log "Running app in ${ENV} mode";

if [[ is_mac ]]; then
    OS_FILE_NAME_PART="mac";
elif [[ is_linux ]]; then
    OS_FILE_NAME_PART="linux";
else
    log "You are on an unsupported platform";
    return 1;
fi

log "Using configuration for ${OS_FILE_NAME_PART}";
load_env_file ".${OS_FILE_NAME_PART}.${ENV}.env";

docker-compose ${@:1};
