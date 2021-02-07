import "reflect-metadata";

export function OnMounted(name?: string): PropertyDecorator {
    return function (target: any, propertyKey: string): void {
        let props: string[] = Reflect.getMetadata("onmounted", target.constructor);

        if (!props) {
            props = [];
        }

        props.push(propertyKey);

        Reflect.defineMetadata("onmounted", props, target.constructor);
    };
}