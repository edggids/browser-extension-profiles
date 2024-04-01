import {describe, expect, test} from "vitest";
import {freezeRoutes} from "./freezeRoutes";

describe('freezeRoutes', () => {
    const frozenRoutes = freezeRoutes({
        route1: {
            component: {},
            child: {
                route2: {
                    component: {},
                },
            },
        },
    });

    test('should freeze recursively', () => {
        expect(Object.isFrozen(frozenRoutes)).toBe(true);
        expect(Object.isFrozen(frozenRoutes.route1)).toBe(true);
        expect(Object.isFrozen(frozenRoutes.route1.child)).toBe(true);
        expect(Object.isFrozen(frozenRoutes.route1.child.route2)).toBe(true);
    });

    test('should not freeze the "component" property', () => {
        expect(Object.isFrozen(frozenRoutes.route1.component)).toBe(false);
        expect(Object.isFrozen(frozenRoutes.route1.child.route2.component)).toBe(false);
    });
});
