module.exports = function(controller, router) {
  router.route('/')
    .get(controller.get)
    .post(controller.post)

  router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)
}
