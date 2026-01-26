import { Routes } from '@angular/router';
import {ClassroomComponent} from "./classroom/classroom.component";
import {Pool1Component} from "./pool1/pool1.component";
import {River1Component} from "./river1/river1.component";
import {Pool2Component} from "./pool2/pool2.component";
import {River2Component} from "./river2/river2.component";
import {Pool3Component} from "./pool3/pool3.component";
import {River3Component} from "./river3/river3.component";
import {River4Component} from "./river4/river4.component";
import {GearChecklistComponent} from "./gear-checklist/gear-checklist.component";
import {IntroductionComponent} from "./introduction/introduction.component";
import {LocationsComponent} from "./locations/locations.component";
import {ClubTripsComponent} from "./club-trips/club-trips.component";
import {AmericanWhitewaterComponent} from "./american-whitewater/american-whitewater.component";
import {RiverGaugesComponent} from "./river-gauges/river-gauges.component";
import {InstructionMaterialsComponent} from "./instruction-materials/instruction-materials.component";
import {ShoppingResourcesComponent} from "./shopping-resources/shopping-resources.component";


export const routes: Routes = [
    {path: '', component: IntroductionComponent},
    {path: 'introduction', component: IntroductionComponent},
    {path: 'classroom', component: ClassroomComponent},
    {path: 'pool1', component: Pool1Component},
    {path: 'river1', component: River1Component},
    {path: 'pool2', component: Pool2Component},
    {path: 'river2', component: River2Component},
    {path: 'pool3', component: Pool3Component},
    {path: 'river3', component: River3Component},
    {path: 'river4', component: River4Component},
    {path: 'locations', component: LocationsComponent},
    {path: 'gearChecklist', component: GearChecklistComponent},
    {path: 'clubRiverTrips', component: ClubTripsComponent},
    {path: 'americanWhitewater', component: AmericanWhitewaterComponent},
    {path: 'riverGauges', component: RiverGaugesComponent},
    {path: 'instructionMaterials', component: InstructionMaterialsComponent},
    {path: 'shoppingResources', component: ShoppingResourcesComponent},
];
