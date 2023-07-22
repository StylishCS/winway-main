/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Modules API
 *   version: 1.0.0
 *   description: API for managing course modules
 * paths:
 *   /module/{course_id}:
 *     post:
 *       summary: Add a module to a course
 *       tags: [Modules]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: course_id
 *           required: true
 *           description: ID of the course to add the module to
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_of_module:
 *                   type: string
 *                   description: The module's name
 *                 size:
 *                   type: number
 *                   description: The module's size
 *       responses:
 *         '201':
 *           description: Created
 *         '400':
 *           description: Bad Request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *     get:
 *       summary: Get all modules for a course
 *       tags: [Modules]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: course_id
 *           required: true
 *           description: ID of the course to get modules for
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Module'
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *   /module/one/{id}:
 *     get:
 *       summary: Get a specific module
 *       tags: [Modules]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the module to get
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Module'
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 *   /module/del/{id}:
 *     delete:
 *       summary: Delete a module
 *       tags: [Modules]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the module to delete
 *           schema:
 *             type: string
 *       responses:
 *         '204':
 *           description: No Content
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not Found
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The module's ID
 *         course_id:
 *           type: number
 *           description: The course's title
 *         name_of_module:
 *           type: string
 *           description: The module's name
 *         size:
 *           type: number
 *           description: The module's size
 */ 

var express = require("express");
var router = express.Router();
const{addModule,getModules ,getModuleOne ,deleteM}= require("../controllers/modulesController")
const {protect} = require('../middleware/protect');

router.post('/:course_id',protect, protect,addModule)
router.get('/:course_id',protect,getModules)
router.get('/one/:id',protect,getModuleOne)
router.delete('/del/:id',protect, deleteM)

module.exports=router;