// router.post('/', jwtCheck, async (req, res, next) => {
//     try {
//       const ids = await db.registerTeacher(req.body);
//       res
//         .status(responseStatus.postCreated)
//         .json(`Added new teacher with ID ${ids}`);
//     } catch (error) {
//       if (error.errno === 19) {
//       next(responseStatus.badRequest)
//       } else {
//         next(responseStatus.serverError);
//       }
//     }
//   });

