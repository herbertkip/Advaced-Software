'use strict';

angular.module('nutritionix.version', [
  'nutritionix.version.interpolate-filter',
  'nutritionix.version.version-directive'
])

.value('version', '0.1');
