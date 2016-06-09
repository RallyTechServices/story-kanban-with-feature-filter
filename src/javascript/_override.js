Ext.override(Rally.ui.cardboard.CardBoard,{

        _getAllowedValues: function(fieldDef){
            if(fieldDef) {
                if (fieldDef.attributeDefinition.AttributeType.toLowerCase() === 'boolean') {
                    return Deft.Promise.when({
                        values: [true, false],
                        sortDirection: 'DESC'
                    });
                } else if (fieldDef.attributeDefinition.Constrained && fieldDef.attributeDefinition.AttributeType.toLowerCase() !== 'object') {
                    return fieldDef.getAllowedValueStore().load().then({
                        success: function (records) {
                            var values = _.invoke(records, 'get', 'StringValue');
                            if (fieldDef.attributeDefinition.Custom) {
                                //removing the sort as per customer request.
                                // Ext.Array.sort(values, function (a, b) {
                                //     a = a.toLowerCase();
                                //     b = b.toLowerCase();
                                //     return a < b ? -1 : (a > b ? 1 : 0);
                                // });
                                // if (_.isEmpty(values[0])) {
                                //     values.push(values.shift());
                                // }
                            } else if (fieldDef.attributeDefinition.AttributeType.toLowerCase() === 'rating' && !values[0]) {
                                values[0] = 'None';
                            }
                            return {
                                values: values
                            };
                        },
                        scope: this
                    });
                }
            }
            return Deft.Promise.when();
        }
});