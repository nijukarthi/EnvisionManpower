import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BreadcrumbService{
    breadcrumbs: { label: string; routerLink?: string | null; disabled?: boolean}[] = [];

    constructor(private router: Router, private route: ActivatedRoute){
        console.log(this.router.events);
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe((event: NavigationEnd) => {
                console.log(this.route);
                this.buildFromUrl(event.urlAfterRedirects);
            })
    }

    private buildFromUrl(url: string){
        console.log(url);
        const segments = url.split('/').filter(segment => Boolean(segment));
        console.log(segments);

        let currentUrl = '';
        this.breadcrumbs = segments.map(segment => {
            currentUrl += `/${segment}`;
            console.log(currentUrl);

            const isNumber = !isNaN(+segment);

            return {
                label: this.format(segment),
                routerLink: (segment === 'home' || segment === 'candidates' || isNumber) ? null : currentUrl,
                disabled: segment === 'home' || segment === 'candidates' || isNumber
            };
        });
        console.log(this.breadcrumbs);
    }

    private format(value: string): string{
        console.log("value", value);
        if(value === 'new') return 'New';
        if(value === 'edit') return 'Edit';
        if(!isNaN(+value)) return value;

        const withSpaces = value.replace(/-/g, ' ');

        return withSpaces
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}