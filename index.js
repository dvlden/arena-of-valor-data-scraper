const fs = require('fs')
const axios = require('axios')
const download = require('download')
const rimfraf = require('rimraf')

const staticData = require('./modules/data.js')
const helpers = require('./modules/helpers.js')

let ids = []
let output = []

let api = {
  hero: 'https://mws.eu.ngame.proximabeta.com/fcgi-bin/gift.fcgi?ticket=miniweb&heroid=',
  history: 'https://mws.eu.ngame.proximabeta.com/fcgi-py/webserver.py/info?heroid=',
  requests: {
    heroes: [],
    history: []
  }
}

rimfraf('scraper', () => {
  helpers.print('Old scraper data removed.', 'success')

  fs.mkdir('scraper', () => {
    helpers.print('Scraper directory created.', 'success')
    helpers.print('Running scraper...', 'success')
    scrape()
  })
})

function scrape () {
  axios.get(api.hero + '0')
    .then(({ data: { data }}) => {
      data.forEach(item => {
        ids.push(Number(item.heroid))
      })

      return ids
    })
    .then(ids => {
      ids.forEach(id => {
        api.requests.heroes.push(axios.get(api.hero + id))
        api.requests.history.push(axios.get(api.history + id))
      })

      return api.requests.heroes
    })
    .then(heroes => {
      axios.all(api.requests.heroes).then(request => {
        request.forEach(({ data: { data } }, index) => {
          output.push({
            id: data.heroid,
            name: data.name,
            title: data.title,
            type: staticData.heroTypes[Number(data.job) - 1],
            hint: data.tips,
            story: data.story.replace(/<br \/><br \/>/g, ' '),
            poise: data.viability * 10 + '%',
            ad: data.damage * 10 + '%',
            ap: data.spelldamage * 10 + '%',
            difficulty: data.difficulty * 10 + '%',
            stats: {
              health: {
                base: data.basehp,
                grow: data.growthhp
              },
              attack: {
                base: data.baseatk,
                grow: data.growthatk
              },
              defense: {
                base: data.basedef,
                grow: data.growthdef
              },
              resistance: {
                base: data.baseres,
                grow: data.growthres
              }
            },
            talents: [data.recommdskill1, data.recommdskill2].map(item => {
              return {
                name: staticData.talents[item].name,
                description: staticData.talents[item].description,
                icon: item,
                cooldown: staticData.talents[item].cooldown
              }
            }),
            skills: data.skill.filter(object => ! object.skillicon.includes('HEAL')).map(object => {
              return {
                name: object.skillname,
                description: object.desc,
                icon: object.skillicon,
                cooldown: {
                  base: object.cooldown / 100 + 's',
                  grow: object.cooldowngrow / 100 + 's'
                },
                energy: {
                  type: staticData.energyTypes[object.energycosttype / 2],
                  base: object.energycost,
                  grow: object.energycostgrow
                }
              }
            }),
            history: {}
          })

          let dirName = data.name.replace(/' '/g, '-').toLowerCase()

          download(
            `https://www.arenaofvalor.com/images/heroes/pic_122_122/${data.heroid}.jpg`,
            `scraper/heroes/${dirName}`,
            { filename: `${data.heroid}.jpg` }
          )
          .then(() => {
            helpers.print(`Downloaded hero "${output[index].name}". File stored as "${data.heroid}.jpg"`, 'success')
          })
          .catch(error => {
            helpers.print(`Hero "${output[index].name}" missing. Data corrupted...`, 'error')
          })

          output[index].talents.forEach(skill => {
            download(
              `https://www.arenaofvalor.com/images/heroes/skill/${skill.icon}.png`,
              `scraper/heroes/${dirName}/spells`,
              { filename: `${skill.icon}.png` }
            )
            .then(() => {
              helpers.print(`Downloaded skill "${skill.name}" for "${output[index].name}". File stored as "${skill.icon}.png"`, 'success')
            })
            .catch(error => {
              helpers.print(`Skill "${skill.name}" for hero "${output[index].name}" missing. Data corrupted...`, 'error')
            })
          })

          output[index].skills.forEach(skill => {
            download(
              `https://www.arenaofvalor.com/images/heroes/skill/${skill.icon}.png`,
              `scraper/heroes/${dirName}/spells`,
              { filename: `${skill.icon}.png` }
            )
            .then(() => {
              helpers.print(`Downloaded skill "${skill.name}" for "${output[index].name}". File stored as "${skill.icon}.png"`, 'success')
            })
            .catch(error => {
              helpers.print(`Skill "${skill.name}" for hero "${output[index].name}" missing. Data corrupted...`, 'error')
            })
          })
        })
      })
      .then(() => {
        axios.all(api.requests.history).then(request => {
          request.forEach(({ data: { data } }, index) => {
            output[index].history = {
              winRate: `${(parseFloat(data.win_rate) * 100).toFixed(1)}%`,
              gameRate: `${(parseFloat(data.game_rate) * 100).toFixed(1)}%`,
              kdaScore: data.kda_score
            }
          })
        })
        .then(() => {
          let jsonOutput = JSON.stringify(output, null, 2)

          fs.writeFile('scraper/data.json', jsonOutput, err => {
            if (err) throw err
          })
        })
      })
    })
}
