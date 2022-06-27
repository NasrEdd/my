declare var bootstrap:any, $:any;



/**
   * Just creating toolTips
   */
export function createToolTips(){
    // creating all tooltips using bootstrap tooltips
    $( function() {
        let tooltipTriggerList:any = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let tooltipList:any = tooltipTriggerList.map(function (tooltipTriggerEl:any) {
            return new bootstrap.Tooltip(tooltipTriggerEl, { placement: 'auto', trigger: 'hover'})
        })
    });
}