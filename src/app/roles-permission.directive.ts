import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { currentUser } from './fake-user';

@Directive({
  selector: '[rolesAllowed]'
})
export class RolesPermissionDirective {
  @Input() rolesAllowed: string[] = [];
  constructor(private templateref: TemplateRef<any>, private viewcontainerref: ViewContainerRef) { }
  ngOnInit(): void {
      if(this.checkRolesAllowed()){
        this.viewcontainerref.createEmbeddedView(this.templateref);
      }else{
        this.viewcontainerref.clear;
      }
    }
  private checkRolesAllowed(): boolean {
    const userRoles = currentUser.roles;
    return this.rolesAllowed.some(role => userRoles.includes(role));
  }
}
