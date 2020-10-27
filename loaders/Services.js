require('app-module-path').addPath(require('app-root-path').toString());

const {asClass, Lifetime} = require('awilix');

const MatchService = require('src/components/match/MatchService');

/**
 * Load and register services to ioc container
 * @param {object} container Awilix container instance
 */
const initializeServices = (container) => {
  [
    MatchService
  ].forEach((service) => {
    container.register(service.name, asClass(service, {
      lifetime: Lifetime.SINGLETON,
    }));
    console.log(`[App] Service started: ${service.name}`);
  });
};

module.exports = initializeServices;
