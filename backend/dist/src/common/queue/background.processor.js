"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BackgroundProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let BackgroundProcessor = BackgroundProcessor_1 = class BackgroundProcessor extends bullmq_1.WorkerHost {
    logger = new common_1.Logger(BackgroundProcessor_1.name);
    async process(job) {
        this.logger.log(`Processing job ${job.id} (Type: ${job.name})`);
        try {
            switch (job.name) {
                case 'fetch-nav':
                    this.logger.log('Fetching live NAV updates from AMFI...');
                    return { status: 'success', data: 'NAV records updated' };
                case 'rebalance-portfolio':
                    const { portfolioId } = job.data;
                    this.logger.log(`Rebalancing portfolio: ${portfolioId}`);
                    return { status: 'success', portfolioId };
                case 'generate-report':
                    const { reportId, userId } = job.data;
                    this.logger.log(`Generating report ${reportId} for user ${userId}`);
                    return { status: 'success', reportId };
                default:
                    this.logger.warn(`Unknown job type: ${job.name}`);
                    return { status: 'error', error: `Unsupported job: ${job.name}` };
            }
        }
        catch (error) {
            this.logger.error(`Failed to process job ${job.id}: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.BackgroundProcessor = BackgroundProcessor;
exports.BackgroundProcessor = BackgroundProcessor = BackgroundProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('background-tasks')
], BackgroundProcessor);
//# sourceMappingURL=background.processor.js.map