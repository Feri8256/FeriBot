const weather = require('weather-js');

module.exports = {
    commandData: {
        name: 'weather',
        description: 'Alap időjárási információk a megadott településen.',
        options: [
            {
                name: 'name-of-settlement',
                type: 3,
                description: 'település neve',
                required: true
            }
        ]
    },
    execute(Discord, client, interaction, options, L) {
        let cityName = options.getString('name-of-settlement');

        weather.find({ search: cityName, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);

            if (result !== [] && result.length) {
                var WeatherInfo = result;
                var CityLocation = WeatherInfo[0].location.name;
                var CityTemp = WeatherInfo[0].current.temperature + ' °C';
                var CityWind = WeatherInfo[0].current.windspeed;
                var WeatherIconUrl = WeatherInfo[0].current.imageUrl;
                var CityHumidity = WeatherInfo[0].current.humidity + ' mg/m^3'; //Nem vagyok biztos a mértékegységben.
                var CurrentDate = WeatherInfo[0].current.date;
                var TempFeelslike = WeatherInfo[0].current.feelslike + ' °C';

                let WeatherEmbed = new Discord.MessageEmbed()
                WeatherEmbed.setColor('#dddddd')
                WeatherEmbed.setThumbnail(WeatherIconUrl)
                WeatherEmbed.setTitle(`${L.WeatherCurrentHere}: ${CityLocation}`)
                WeatherEmbed.setDescription(String(CurrentDate))
                WeatherEmbed.addFields(
                    { name: L.WeatherTemp, value: String(CityTemp), inline: true },
                    { name: L.WeatherWind, value: String(CityWind), inline: true },
                    { name: L.WeatherHumidity, value: String(CityHumidity), inline: true },
                    { name: L.WeatherTempFeels, value: String(TempFeelslike), inline: true }
                )
                WeatherEmbed.setTimestamp();

                interaction.reply({embeds: [WeatherEmbed]});
            }
            else {
                interaction.reply({content: 'Hiba! (x_x)'});
            }
        })
    }
}