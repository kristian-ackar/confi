const SKIP: string[] = ['id', 'created', 'updated'];

export abstract class BaseModel {
	map(obj: Object) {
		for (let [key, value] of Object.entries(obj)) {
			if (Reflect.getMetadata("design:type", this, key)) {
				if (SKIP.includes(key)) {
					continue;
				} else {
					this[key] = value;
				}
			}
		}
	}
}