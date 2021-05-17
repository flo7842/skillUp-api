const { Video } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/video/:id', auth, (req, res) => {
    Video.findByPk(req.params.id).then(video => {
      if(video === null){
        const message = `La vidéo demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const videoDeleted = video;
      return Video.destroy({
        where: { id: video.id }
      })
      .then(_ => {
        const message = `La catégorie ${videoDeleted.url} a bien été supprimé.`
        res.json({message, data: videoDeleted })
      })
      .catch(error => {
        const message = 'La catégorie n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}