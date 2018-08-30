#!/bin/sh

HOST_OS=`uname`
HOST_ARCH=`uname -m`

case ${HOST_ARCH} in
	i386|i686) HOST_ARCH="x86";;
	x86_64|amd64) HOST_ARCH="x64";;
	armv6|armv7|armv7s|armv7l) HOST_ARCH="arm";;
	aarch64) HOST_ARCH="arm64";;
	mips|mipsel) HOST_ARCH="mips";;
	mips64) HOST_ARCH="mips64";;
	powerpc) HOST_ARCH="ppc";;
	ppc64) HOST_ARCH="ppc64";;
esac

case ${HOST_OS} in
	Darwin) HOST_OS="darwin";;
	Linux) HOST_OS="linux";;
	FreeBSD) HOST_OS="freebsd";;
esac

if  [ ! -d "/usr/local/bin" ];then
sudo mkdir /usr/local/bin
sudo chmod 755 /usr/local/bin
export PATH=$PATH:/usr/local/bin
echo "export PATH=$PATH:/usr/local/bin" >>  ~/.bashrc
source ~/.bashrc
echo "======================================================"
echo 'if you will run fibos, please exec `source ~/.bashrc`'
echo "======================================================"
fi

curl https://fibos.io/installs/installer-${HOST_OS}.sh >> installer.sh
sh installer.sh
rm installer.sh
