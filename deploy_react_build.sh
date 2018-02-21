#!/bin/sh

echo "Please enter environment (staging or production):" 
read BUILD_ENV

NEW_LINE="\n"

IP_CONFIG_FILE="/Users/manojm/Desktop/Projects/AWSKeyVobbey/ip_config_file"
REACT_CONFIG_FILE="/Users/manojm/Desktop/Projects/VobbeyUI/vobbey_ui/src/config/config.js"

if [ $BUILD_ENV == 'staging' ] || [ $BUILD_ENV == 'production' ]; then
	echo "\nEnvironment: "$BUILD_ENV
else
	echo "Invalid Environment"
	exit
fi

echo $BUILD_ENV Build Starting .. 
# echo $NEW_LINE
# echo "Checking environment set in config ... "
# echo $NEW_LINE

CONFIG_ENV=$(grep -i 'let environment' /Users/manojm/Desktop/Projects/VobbeyUI/vobbey_ui/src/config/config.js | awk 'BEGIN{FS="'"'"'"}{print $2}')

PAYMENT_CONFIG_ENV=$(grep -i 'let paymentEnv' /Users/manojm/Desktop/Projects/VobbeyUI/vobbey_ui/src/config/config.js | awk 'BEGIN{FS="'"'"'"}{print $2}')
# mm=grep -Po '(?<=environment=).*' $REACT_CONFIG_FILE
#echo $CONFIG_ENV

if [ $BUILD_ENV != $CONFIG_ENV ]  ; then

	echo "Your configuration environment is set as '$CONFIG_ENV'. Please set it to '$BUILD_ENV' "
	exit;
fi	

if [ $PAYMENT_CONFIG_ENV != 'production' ]  ; then

	echo "Your Paypal environment is set as '$PAYMENT_CONFIG_ENV'. Please set it to 'production' "
	exit;
fi

if [ $BUILD_ENV == 'staging' ]  ; then
	IP_ADDRESS="$( jq -r '.staging' "${IP_CONFIG_FILE}" )"
elif [ $BUILD_ENV == 'production' ]; then
	IP_ADDRESS="$( jq -r '.production' "${IP_CONFIG_FILE}" )"
fi

echo "${BUILD_ENV} Server IP Address: "$IP_ADDRESS
echo $NEW_LINE
echo "Creating the UI bundle.... "
echo $NEW_LINE

npm run build
echo $NEW_LINE
echo "Copying the react UI bundle.... "
echo $NEW_LINE

sudo scp -i /Users/manojm/Desktop/Projects/AWSKeyVobbey/vobbey_staging_ec2-user.pem -r /Users/manojm/Desktop/Projects/VobbeyUI/vobbey_ui/build/* ec2-user@${IP_ADDRESS}:/var/www/html

echo "$BUILD_ENV Build complete.. "
echo $NEW_LINE