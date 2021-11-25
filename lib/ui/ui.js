angular.module("ui", []);

angular.module("ui").run(function ($templateCache) {
    $templateCache.put("../view/accordion.html", `<div class="ui-accordion-title" ng-click="open()" >{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>`);
});

angular.module("ui").directive("uiAccordions", function () {
    return {
        controller: function ($scope, $element) {
            var accordions = [];
            this.registerAccordion = function (accordion) {
                accordions.push(accordion)
            };

            this.closeAll = function () {
                accordions.forEach(function (accordions) {
                    accordions.isOpened = false;
                });
            }
        }
    };
});

angular.module("ui").directive("uiAccordion", function () {
    return {
        templateUrl: "../view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: '^uiAccordions',
        link: function (scope, element, attributes, controller) {
            controller.registerAccordion(scope)

            scope.open = function () {
                controller.closeAll();
                scope.isOpened = !scope.isOpened;
            }
        }
    };
});