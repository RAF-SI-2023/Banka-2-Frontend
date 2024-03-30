import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IamService } from 'src/app/services/iam.service';

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css'],
})
export class AddAgentDialogComponent implements OnInit {
  agentForm!: FormGroup;

  constructor(private fb: FormBuilder, private iamService: IamService) { }

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: [''],
      phone: ['', Validators.required],
      address: [''],
      limit: [0, Validators.required],
      leftOfLimit: [0, Validators.required],
      permissions: this.fb.array([])
    });
  }

  addAgent() {
    if (this.agentForm.valid) {
      const agentData = this.agentForm.value;
      console.log(agentData);
      this.iamService.postCreateAgent(agentData).subscribe({
        next: (response) => console.log('Agent dodat', response),
        error: (error) => console.error('Greška pri dodavanju agenta', error)
      });
    }
  }
}
