import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-manager',
  imports: [Shared],
  templateUrl: './resource-manager.html',
  styleUrl: './resource-manager.scss'
})
export class ResourceManager implements OnInit {

  constructor(private apiService: Apiservice){}

  envisionRoleList: any;

  demandFullfillList = [
        {
            "requesitionCode": 'ABC',
            "stepId": 1,
            requestedBy: 'Admin',
            "demandCode": "R2710001-1",
            pCode: 'P8002',
            clusterCode: 'KA',
            "spn": {
                "spnId": 5,
                "spnCode": "SPN328345",
                "spnDescription": "Project Civil Manager",
                "experience": "6-8"
            },
            "quantity": 5,
            "plannedDeploymentDate": "2025-11-21",
            "plannedReleaseDate": "2025-11-06"
          },
         {
            "requesitionCode": 'DEF',
            "stepId": 3,
            requestedBy: 'Admin',
            clusterCode: 'TN',
            "demandCode": "R2710001-2",
            pCode: 'P8003',
            "spn": {
                "spnId": 5,
                "spnCode": "SPN328346",
                "spnDescription": "Project Civil Manager",
                "experience": "6-8"
            },
            "quantity": 5,
            "plannedDeploymentDate": "2025-11-21",
            "plannedReleaseDate": "2025-11-06"
        },
          {
            "requesitionCode": 'XYZ',
            "stepId": 4,
            requestedBy: 'Admin',
            "demandCode": "R2710001-3",
            clusterCode: 'KA',
            pCode: 'P8004',
            "demandStatus": 102,
            "spn": {
                "spnId": 5,
                "spnCode": "SPN328343",
                "spnDescription": "Project Civil Manager",
                "experience": "6-8"
            },
            "quantity": 5,
            "plannedDeploymentDate": "2025-11-21",
            "plannedReleaseDate": "2025-11-06"
        },
        {
            "requesitionCode": 'MNO',
            "stepId": 6,
            requestedBy: 'Admin',
            "demandCode": "R2710001-3",
            clusterCode: 'KA',
            pCode: 'P8005',
            "demandStatus": 102,
            "spn": {
                "spnId": 5,
                "spnCode": "SPN328343",
                "spnDescription": "Project Civil Manager",
                "experience": "6-8"
            },
            "quantity": 5,
            "plannedDeploymentDate": "2025-11-21",
            "plannedReleaseDate": "2025-11-06"
        }
    ]

    ngOnInit(): void {
      this.fetchEnvisionRole();
    }

    fetchEnvisionRole(){
      this.apiService.fetchActiveEnvRole('').subscribe({
        next: val => {
          console.log(val);
          this.envisionRoleList = val.data;
        },
        error: err => {
          console.log(err);
        }
      })
    }
}
