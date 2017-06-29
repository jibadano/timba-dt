import { Component} from '@angular/core';

@Component({
  selector: 'not-found',
   template: `
   <body class="four-zero-four">
    <div class="four-zero-four-container">
        <div class="error-code">404</div>
        <div class="error-message">This page doesn't exist</div>
        <div class="button-place">
            <a href="/" class="btn btn-default btn-lg waves-effect">GO TO HOMEPAGE</a>
        </div>
    </div>
</body>
   `  
})

export class NotFoundComponent {}