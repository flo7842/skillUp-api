const { Video } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/video/:id', auth, (req, res) => {
    const id = req.params.id
    Video.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Video.findByPk(id).then(video => {
        if(video === null){
          const message = `La video demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = `La video ${video.descripttion} a bien été modifié.`
        res.json({message, data: video })
      })
    })
    .catch(error => {
      
      const message = 'La vidéo n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}