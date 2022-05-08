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
        //interaction.deferReply();
        let cityName = options.getString('name-of-settlement');

        weather.find({ search: cityName, degreeType: 'C' }, function (err, result) {
            if (err) console.log(err);

            if (!err && result !== [] && result.length) {
                let wInfo = result;
                let cityName = wInfo[0].location.name;
                let cityTemp = `${wInfo[0].current.temperature} °C`;
                let cityWind = wInfo[0].current.windspeed;
                let wIconUrl = wInfo[0].current.imageUrl;
                let cityHumidity = `${wInfo[0].current.humidity} mg/m^3`; //Nem vagyok biztos a mértékegységben.
                let currentDate = wInfo[0].current.date;
                let tempFeelslike = `${wInfo[0].current.feelslike} °C`;

                let WeatherEmbed = new Discord.MessageEmbed()
                WeatherEmbed.setColor('#dddddd')
                WeatherEmbed.setThumbnail(wIconUrl)
                WeatherEmbed.setTitle(`${L.WeatherCurrentHere}: ${cityName}`)
                WeatherEmbed.setDescription(String(currentDate))
                WeatherEmbed.addFields(
                    { name: L.WeatherTemp, value: String(cityTemp), inline: true },
                    { name: L.WeatherWind, value: String(cityWind), inline: true },
                    { name: L.WeatherHumidity, value: String(cityHumidity), inline: true },
                    { name: L.WeatherTempFeels, value: String(tempFeelslike), inline: true }
                )
                WeatherEmbed.setTimestamp();

                interaction.reply({embeds: [WeatherEmbed]});
            }
            else {
                interaction.reply({content: L.CommandsGeneralError});
            }
        })
    }
}