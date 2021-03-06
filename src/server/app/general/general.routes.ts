import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../shared/base-route';
import { GeneralController } from './general.controller';
import { GeneralRoutes as GeneralStaticRoutes } from '../../../shared/routes/general.routes';
import { Authentication } from '../../core/middleware/authentication';

export class GeneralRoutes extends BaseRoute {
    generalController: GeneralController;

    constructor() {
        super();
        this.generalController = new GeneralController();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post(GeneralStaticRoutes.createNewsletterMember.constructEndpointUrl(), (req, res, next) => this.generalController.createNewsletterMember(req, res, next));
        this.router.post(GeneralStaticRoutes.deleteNewsletterMember.constructEndpointUrl(), (req, res, next) => this.generalController.deleteNewsletterMember(req, res, next));
        this.router.post(GeneralStaticRoutes.sendFeedback.constructEndpointUrl(), (req, res, next) => this.generalController.sendFeedback(req, res, next));

        this.router.post(GeneralStaticRoutes.paymentRequest.constructEndpointUrl(), (req, res, next) => this.generalController.paymentRequest(req, res, next));
    }
}
